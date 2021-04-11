package rva.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Projekat;
import rva.repository.ProjekatRepository;

@CrossOrigin
@Api(tags = {"Projekat CRUD operacije"})
@RestController
public class ProjekatRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ProjekatRepository projekatRepository;
	
	@ApiOperation(value = "Vraca kolekciju projekata iz baze podataka")
	@GetMapping("/projekat")
	public Collection<Projekat> getProjekat(){
		return projekatRepository.findAll();
	}

	@ApiOperation(value = "Vraca projekat iz baze podataka sa zadatim id")
	@GetMapping("/projekat/{id}")
	public Projekat getProjekat(@PathVariable("id") Integer id){
		return projekatRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraca kolekciju projekata iz baze podataka sa zadatim imenom")
	@GetMapping("/projekat/naziv/{naziv}")
	public Collection<Projekat> getProjekatByNaziv(@PathVariable("naziv") String naziv){
		return projekatRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@ApiOperation(value = "Upisuje projekat u bazu podataka")
	@PostMapping("/projekat")
	public ResponseEntity<Projekat> insertProjekat(@RequestBody Projekat projekat){
		if(!projekatRepository.existsById(projekat.getId())) {
			return new ResponseEntity<Projekat>(HttpStatus.CONFLICT);
		}
		projekatRepository.save(projekat);
		return new ResponseEntity<Projekat>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Izmena projekta iz baze podataka")
	@PutMapping("/projekat")
	public ResponseEntity<Projekat> updateProjekat(@RequestBody Projekat projekat){
		if(!projekatRepository.existsById(projekat.getId())) {
			return new ResponseEntity<Projekat>(HttpStatus.NO_CONTENT);
		}
		projekatRepository.save(projekat);
		return new ResponseEntity<Projekat>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Brisanje projekta iz baze podataka po odgovarajucem id")
	@DeleteMapping("/projekat/{id}")
	public ResponseEntity<Projekat> deleteProjekat(@PathVariable("id") Integer id){
		if(!projekatRepository.existsById(id)) {
			return new ResponseEntity<Projekat>(HttpStatus.NO_CONTENT);
		}
		
		
		
		projekatRepository.deleteById(id);
		
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"projekat\"(\"id\", \"naziv\", \"oznaka\", \"opis\")"
					+ "VALUES(-100, 'Seminarski', 'SE', 'Napisati seminarski')"
					);
		}
		
		return new ResponseEntity<Projekat>(HttpStatus.OK);
	}
}
