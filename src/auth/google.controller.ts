import { Controller, Redirect, Get, Query, Res } from '@nestjs/common';
import { GoogleService } from './google.service';
import { Response } from 'express';
// import { omit } from 'lodash';

@Controller('/auth/google')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get()
  @Redirect('', 301)
  async signin() {
    const authUrl = this.googleService.generateUrl();
    return { url: authUrl };
  }

  @Get('/callback')
  @Redirect('http://localhost:3006', 301)
  async callback(
    @Query() query: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const credentials = await this.googleService.getCredentials(query);
      res.cookie('auth', credentials.cookie, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      //We can store the state like the access token inside the url and set it in the frontend.
      return { url: 'http://localhost:3006' };
      // return { message: credentials.message, accessToken: credentials.accessToken };
    } catch (error) {
      return `Sorry Failed due to Error ${error}`;
    }
  }
}
