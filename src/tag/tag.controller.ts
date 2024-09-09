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
@ApiTags('tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: TagReq): Promise<TagReponseModel> {
    return this.tagService.createTag(createTagDto);
  }

  @Get()
  findAll(): Promise<TagReponseModel> {
    return this.tagService.getAllTag();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: TagReq,
  ): Promise<TagReponseModel> {
    return this.tagService.updateTag(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TagReponseModel> {
    return this.tagService.deleteTag(+id);
  }
}
