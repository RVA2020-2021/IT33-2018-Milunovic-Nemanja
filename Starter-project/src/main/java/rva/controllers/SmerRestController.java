package rva.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
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
import rva.jpa.Smer;
import rva.repository.SmerRepository;

@CrossOrigin
@Api(tags = {"Smer CRUD operacije"})
@RestController
public class SmerRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private SmerRepository smerRepository;
	
	@ApiOperation(value = "Vraca kolekciju smerova iz baze podataka")
	@GetMapping("/smer")
	public Collection<Smer> getSmer(){
		return smerRepository.findAll();
	}
	
	@ApiOperation(value = "Vraca smer iz baze podataka sa zadatim id")
	@GetMapping("/smer/{id}")
	public Smer getSmer(@PathVariable("id") Integer id){
		return smerRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraca kolekciju smerova iz baze podataka sa zadatim imenom")
	@GetMapping("/smer/naziv/{naziv}")
	public Collection<Smer> getSmerByNaziv(@PathVariable("naziv") String naziv){
		return smerRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@ApiOperation(value = "Upisuje smer u bazu podataka")
	@PostMapping("/smer")
	public ResponseEntity<Smer> insertSmer(@RequestBody Smer smer){
		if(!smerRepository.existsById(smer.getId())){
			smerRepository.save(smer);
			return new ResponseEntity<Smer>(HttpStatus.OK);
		}
		return new ResponseEntity<Smer>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Izmena smera iz baze podataka")
	@PutMapping("/smer")
	public ResponseEntity<Smer> updateSmer(@RequestBody Smer smer){
		if(!smerRepository.existsById(smer.getId())) {
			return new ResponseEntity<Smer>(HttpStatus.NO_CONTENT);
		}
		smerRepository.save(smer);
		return new ResponseEntity<Smer>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Brisanje smera iz baze podataka po odgovarajucem id")
	@Transactional
	@DeleteMapping("/smer/{id}")
	public ResponseEntity<Smer> deleteSmer(@PathVariable("id") Integer id){
		if(!smerRepository.existsById(id)) {
			return new ResponseEntity<Smer>(HttpStatus.NO_CONTENT);
		}
		
		if(id == -100) {
			jdbcTemplate.execute("DELETE FROM student WHERE grupa = -100");
		}
		
		jdbcTemplate.execute("DELETE FROM grupa WHERE smer = " + id);
		
		smerRepository.deleteById(id);
		smerRepository.flush();		
		
		if(id == -100) {
			
			jdbcTemplate.execute(
					"INSERT INTO \"smer\"(\"id\", \"naziv\", \"oznaka\")"
					+ "VALUES (-100, 'Inzenjerski menadzment', 'IIM');"
					);
			
			jdbcTemplate.execute(
					"INSERT INTO \"grupa\"(\"id\", \"oznaka\", \"smer\")"
					+ "VALUES(-100, 'G1', '-100')"
					);
			
			jdbcTemplate.execute(
					"INSERT INTO \"student\"(\"id\", \"ime\", \"prezime\", \"broj_indeksa\", \"grupa\", \"projekat\")"
					+ "VALUES(-100, 'Milan', 'Milankovic', 'IIM-23/2018', '-100', '-100')"
					);
		}
		
		return new ResponseEntity<Smer>(HttpStatus.OK);		
	}
}
