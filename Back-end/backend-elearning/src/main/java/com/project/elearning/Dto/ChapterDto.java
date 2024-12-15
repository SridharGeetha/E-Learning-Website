package com.project.elearning.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterDto {
    private String chapterTitle;
    private byte[] videoFileName;
}
