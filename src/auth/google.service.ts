import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { EnvironmentVariables } from 'src/env.interface';
import { UserService } from 'src/users/user.service';

@Injectable()
export class GoogleService {
  oauth2Client;
  scopes: Array<string>;

  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.oauth2Client = new google.auth.OAuth2({
      clientId: this.configService.get('OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('OAUTH_CLIENT_SECRET'),
      redirectUri: this.configService.get('REDIRECT_URL'),
    });
    this.scopes = ['profile', 'email'];
  }

  generateUrl() {
    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });

    return authUrl;
  }

  async getCredentials(query: any) {
    const { tokens } = await this.oauth2Client.getToken(query.code);
    this.oauth2Client.setCredentials(tokens);

    const peopleApi = google.people({
      version: 'v1',
      auth: this.oauth2Client,
    });

    const { data } = await peopleApi.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names',
    });

    const name = data.names[0].displayName;
    const email = data.emailAddresses[0].value;

    const user = await this.userService.verify(email);
    if (!user)
      throw new UnauthorizedException('You are not there in the Database');

    const accessToken = await this.jwtService.signAsync(user, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const refreshToken = await this.jwtService.signAsync(user, {
      secret: this.configService.get('REFRESH_SECRET'),
    });

    return {
      message: `Hello ${name} using email ${email}.`,
      accessToken: accessToken,
      cookie: refreshToken,
    };
  }
}
