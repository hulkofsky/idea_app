import { Controller, Post, Get, Body, UsePipes, UseGuards, Query } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { ValidationPipe } from 'shared/validation.pipe';
import { UserService } from './user.service';
import { AuthGuard } from 'shared/auth.guard';
import { User } from './user.decorator';

@Controller()
export class UserController {
    constructor(private userService: UserService){}

    @Get('users')
    getAllUsers(@Query('page') page: number){
        return this.userService.getAll(page)
    }

    @Post('login')
    @UsePipes(new ValidationPipe)
    login(@Body() data: UserDTO){
        return this.userService.login(data)
    }

    @Post('register')
    @UsePipes(new ValidationPipe)
    register(@Body() data: UserDTO){
        return this.userService.register(data)
    }

    @Post('recover')
    //@UsePipes(new ValidationPipe)
    recover(@Body() data: UserDTO){
        return this.userService.recover(data)
    }
}

