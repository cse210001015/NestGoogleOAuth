import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users = [];
  constructor() {
    this.users = [
      {
        email: 'cse210001015@iiti.ac.in',
        role: 'Admin',
      },
    ];
  }

  async verify(email: string): Promise<string | null> {
    for (const user of this.users) {
      if (user.email === email) return user;
    }
    return null;
  }
}
