package rva.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldRestController {

	@RequestMapping("/a")
	public String helloWorld() {
		return "You went to localhost:8083/a!";
	}
	
	@RequestMapping("/")
	public String defaultMethod() {
		return "Welcome to localhost:8083!";
	}
	
}
