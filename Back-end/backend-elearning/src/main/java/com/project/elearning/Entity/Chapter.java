package com.project.elearning.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Objects;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "chapter")
@Data
public class Chapter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chapterId;

    private String chapterTitle;

    @Lob
    @Column(name = "video_file_name",columnDefinition = "VARBINARY(MAX)")
    private byte[] videoFileName;

    @ManyToOne()
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties("chapters")
    private Course course;

    @Override
    public int hashCode() {
        return Objects.hash(chapterId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chapter chapter = (Chapter) o;
        return Objects.equals(chapterId, chapter.chapterId);
    }
}
