import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { IdeaModule } from './idea/idea.module';
import { HttpErrorFilter } from 'shared/http-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggimgInterceptor } from 'shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({req})=>({headers: req.headers})
    }),
    IdeaModule, 
    UserModule, 
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggimgInterceptor,
    },
  ],
})
export class AppModule {}
