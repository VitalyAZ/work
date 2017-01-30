package com.myeu.ebd.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Vitalii Zenchenko
 */
@RestController
@RequestMapping("/upload")
public class UploadController {
    private static final List<XsdEntity> XSD_ENTITIES =  new ArrayList<>();

    @RequestMapping("/xsd")
    public void uploadXsd(@RequestParam("file") MultipartFile file) {
        try {
            String rootDirectory = "C:\\prj\\ebd\\uploaded_files\\";
            System.err.println("Root Directory " + rootDirectory);
            try {
                file.transferTo(new File(rootDirectory + file.getOriginalFilename()));
            } catch (IllegalStateException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (int i = 0; i < 250; i++) {
            XsdEntity xsdEntity = new XsdEntity();
            xsdEntity.setPath("interchange/bussinesMessages/bussinesMessage/paymentsMessages/instruction/references/party" + i);
            xsdEntity.setLength("400" + i);
            xsdEntity.setEnums(new ArrayList<String>(){{add("AAA"); add("BBBB"); add("CCCCC");}});
            XSD_ENTITIES.add(xsdEntity);
        }
    }

    @RequestMapping("/xlsx")
    public void uploadXls(@RequestParam("file") MultipartFile file) {
        try {
            String rootDirectory = "C:\\prj\\ebd\\uploaded_files\\xlsx\\";
            System.err.println("Root Directory " + rootDirectory);
            try {
                file.transferTo(new File(rootDirectory + new File(file.getOriginalFilename()).getName()));
            } catch (IllegalStateException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }



    }

    @RequestMapping("/upload_more")
    public List<XsdEntity> upload(@RequestParam("size") int size) {
        if (size > XSD_ENTITIES.size())
            return new ArrayList<>();
        System.err.println("upload size " + size);
        System.err.println("upload XSD_ENTITIES " + XSD_ENTITIES.size());
        return size == XSD_ENTITIES.size() ? XSD_ENTITIES :  XSD_ENTITIES.subList(0, size);
    }


}

class XsdEntity {
    private String path;
    private String length;
    private List<String> enums;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public List<String> getEnums() {
        return enums;
    }

    public void setEnums(List<String> enums) {
        this.enums = enums;
    }
}