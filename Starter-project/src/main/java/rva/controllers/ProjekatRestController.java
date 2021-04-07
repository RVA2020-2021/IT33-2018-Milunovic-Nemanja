package rva.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Projekat;
import rva.repository.ProjekatRepository;

@RestController
public class ProjekatRestController {
	
	@Autowired
	private ProjekatRepository projekatRepository;
	
	@GetMapping("/projekat")
	public Collection<Projekat> getProjekat(){
		return projekatRepository.findAll();
	}

	@GetMapping("/projekat/{id}")
	public Projekat getProjekat(@PathVariable("id") Integer id){
		return projekatRepository.getOne(id);
	}
	
	@GetMapping("/projekat/naziv/{naziv}")
	public Collection<Projekat> getProjekatByNaziv(@PathVariable("naziv") String naziv){
		return projekatRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
}
