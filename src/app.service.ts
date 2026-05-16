import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return '✅ Server health is 100% fine 🚀';
  }
}
