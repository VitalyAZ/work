package com.myeu.ebd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author vzenchenko.
 */
@Controller
public class AppController {
    @RequestMapping("/")
    public String index() {
        return "index";
    }
}
