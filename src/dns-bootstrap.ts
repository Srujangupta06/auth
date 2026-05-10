import * as dns from 'dns';

/**
 * When Node's resolver list is loopback-only (common on Windows), SRV lookups for
 * mongodb+srv often fail with querySrv ECONNREFUSED. Prefer DNS_SERVERS from env,
 * otherwise fall back to public resolvers only in that situation.
 */
const fromEnv = process.env.DNS_SERVERS?.split(',')
  .map((s) => s.trim())
  .filter(Boolean);
if (fromEnv?.length) {
  dns.setServers(fromEnv);
} else {
  const current = dns.getServers();
  const onlyLoopback =
    current.length > 0 &&
    current.every((a) => a === '127.0.0.1' || a === '::1');
  if (onlyLoopback) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }
}
