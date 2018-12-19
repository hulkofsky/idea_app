import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CommentService } from "comment/comment.service";
import { UserDTO } from "./user.dto";
import { AuthGuard } from "shared/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver('User')
export class UserResolver {
    constructor (
        private userService: UserService, 
        private commentService: CommentService
    ){}
    
    @Query()
    async users(@Args('page') page: number){
        return await this.userService.getAll(page)
    }

    @Query()
    async user(@Args('username') username: string){
        return await this.userService.getOne(username)
    }

    @Query()
    @UseGuards(new AuthGuard)
    async whoami(@Context('user') user){
        const {username} = user
        return await this.userService.getOne(username)
    }

    @Mutation()
    async login(
        @Args('username') username: string, 
        @Args('password') password: string
    ){
        const user: UserDTO = {username, password}
        return await this.userService.login(user)
    }
    
    @Mutation()
    async register(
        @Args('username') username: string, 
        @Args('password') password: string
    ){
        const user: UserDTO = {username, password}
        return await this.userService.register(user)
    }

    @ResolveProperty()
    async comments(@Parent() user){
        const {id} = user
        return await this.commentService.showByUser(id)
    }
}