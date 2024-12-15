package com.project.elearning.Dto;

import lombok.Data;

@Data
public class ChapterResponseDto {
    private Long id;
    private String Chaptertitle;
    private byte[] video;

    public ChapterResponseDto(Long id, String title, byte[] video) {
        this.id = id;
        this.Chaptertitle = title;
        this.video = video;
}
}
