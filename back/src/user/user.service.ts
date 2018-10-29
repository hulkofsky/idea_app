import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
import * as nodemailer from 'nodemailer'
import mailerConfig from '../nodemailerConfig'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}

    async getAll(page: number = 1):Promise<UserRO[]>{
        const users = await this.userRepository.find({
            relations: ['ideas', 'bookmarks'],
            take: 25,
            skip: 25 * (page - 1)
        })
        return users.map(user => user.toResponseObject(false))
    }

    async getOne(username: string){
        const user = await this.userRepository.findOne({
            where: {username},
            relations: ['ideas', 'bookmarks']
        })
        return user.toResponseObject(false)
    }

    async login(data: UserDTO):Promise<UserRO>{
        console.log(data, "userdata")
        const{username, password} = data
        const user = await this.userRepository.findOne({where: {username}})
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST
            )
        }
        return user.toResponseObject()
    }

    async register(data: UserDTO):Promise<UserRO>{
        const {username} = data
        let user = await this.userRepository.findOne({where: {username}})
        if(user){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }
        user = await this.userRepository.create(data)
        await this.userRepository.save(user)
        return user.toResponseObject()
    }

    async recover(data: UserDTO):Promise<UserRO[]>{
        const users = await this.userRepository.find({relations: ['ideas', 'bookmarks']})
        
        console.log(mailerConfig, 'mailerConfig')

        //sendmail here
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                service: mailerConfig.service,
                auth: {
                    user: mailerConfig.auth.user,
                    pass: mailerConfig.auth.pass
                }
            })

            const mailOptions = {
                from: mailerConfig.from,
                to: mailerConfig.to, //place EMAIL parameter here
                subject: mailerConfig.subject,
                html: mailerConfig.html
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log({success: false, message: `error while sending email - ${error}`})
                }
               return console.log({success: true, message: `Email sent to ${mailerConfig.to}`})
               
            })
        })
        return users.map(user => user.toResponseObject(false))
    }
}
