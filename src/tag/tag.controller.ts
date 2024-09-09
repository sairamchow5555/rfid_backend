import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagReq } from './dto/tag-req';
import { TagReponseModel } from './dto/tag-response-model';
import { ApiTags } from '@nestjs/swagger';
import { TagModel } from './dto/tag-model';
@ApiTags('tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('createTag')
  create(@Body() dto: TagModel): Promise<TagReponseModel> {
    return this.tagService.createTag(dto);
  }

  @Post('getAllOpenTags')
  findAll(): Promise<TagReponseModel> {
    return this.tagService.getAllTag();
  }

  @Post('updateTag/:id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: TagModel,
  ): Promise<TagReponseModel> {
    return this.tagService.updateTag(+id, updateTagDto);
  }

  @Delete('deleteTag/:id')
  remove(@Param('id') id: number): Promise<TagReponseModel> {
    return this.tagService.deleteTag(+id);
  }
}
