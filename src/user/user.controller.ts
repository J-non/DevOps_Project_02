import { Res, Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Inject, Req, UploadedFile, Query, UsePipes, Headers, HttpStatus, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request, query } from "express";
import { JsonWebTokenError } from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards/token.guard';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly jwt: JwtService, private readonly userService: UserService) { }

  @Post("createUser")
  @ApiOperation({ summary: "회원가입" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        loginId: { type: "string" },
        password: { type: "string" },
        oauthType: { type: "string" },
        nickname: { type: "string" },
        file: { type: "string", format: "binary" }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() userInfo: CreateUserDto, @Req() req: Request, @Query("token") token: string) {
    let data = null;
    if (token) {
      data = await this.userService.createSotial(userInfo, token);
      return data;
    }
    data = await this.userService.create(userInfo, file);
    return data;
  }

  @Post('signin')
  @ApiOperation({ summary: "로그인" })
  @ApiBody({
    schema: {
      properties: {
        loginId: { type: "string" },
        password: { type: "string" },
        oauthType: { type: "string" },
      }
    }
  })
  async signIn(@Body('loginId') id: string, @Body("password") password: string, @Body("oauthType") oauthType: string, @Res() res: Response) {
    const token = await this.userService.signIn(id, password, oauthType, null);
    if (token) {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 60);
      res.cookie("token", token, { httpOnly: true, expires: date });
      return res.redirect("http://localhost:8000");
    } else {
      res.setHeader("content-type", "text/html");
      return res.send("<script>alert('계정을 다시 확인해주세요');location.href='http://localhost:8000/user/signin'</script>")
    }
  }

  @Post("logout")
  @ApiOperation({ summary: "로그아웃" })
  async logout(@Req() req: Request, @Res() res: Response) {
    const { token } = req.cookies;
    const result = await this.userService.logout(token);
    res.clearCookie('token');
    res.status(HttpStatus.OK);
    res.send(result);
  }

  @Post('mypage')
  @UseGuards(TokenGuard)
  @ApiOperation({ summary: "mypage" })
  async myPage(@Req() req: Request, @Res() res: Response) {
    const { token } = req.cookies;
    const info = await this.userService.userInfo(token);
    return res.send(info);
  }

  @Put("modify")
  @UseInterceptors(FileInterceptor('file'))
  async modify(@Req() req: Request, @UploadedFile() file: Express.Multer.File,) {
    try {
      const info = req.body;
      const data = await this.userService.modify(file, info);
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  @Delete("delete")
  async deleteUser(@Body("id", ParseIntPipe) id: number) {
    console.log("test")
    await this.userService.delete(id);
  }
}
