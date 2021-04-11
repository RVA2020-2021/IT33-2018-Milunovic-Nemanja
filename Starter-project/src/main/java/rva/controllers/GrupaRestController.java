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
import rva.jpa.Grupa;
import rva.repository.GrupaRepository;

@CrossOrigin
@Api(tags = {"Grupa CRUD operacije"})
@RestController
public class GrupaRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private GrupaRepository grupaRepository;
	
	@ApiOperation(value = "Vraca kolekciju grupa iz baze podataka")
	@GetMapping("/grupa")
	public Collection<Grupa> getGrupa(){
		return grupaRepository.findAll();
	}
	
	@ApiOperation(value = "Vraca grupu iz baze podataka sa zadatim id")
	@GetMapping("/grupa/{id}")
	public Grupa getGrupa(@PathVariable("id") Integer id) {
		return grupaRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraca kolekciju grupa iz baze podataka sa zadatom oznakom")
	@GetMapping("/grupa/oznaka/{oznaka}")
	public Collection<Grupa> getGrupaByOznaka(@PathVariable("oznaka") String oznaka){
		return grupaRepository.findByOznakaContainingIgnoreCase(oznaka);
	}
	
	@ApiOperation(value = "Upisuje grupu u bazu podataka")
	@PostMapping("/grupa")
	public ResponseEntity<Grupa> insertGrupa(@RequestBody Grupa grupa){
		if(!grupaRepository.existsById(grupa.getId())) {
			grupaRepository.save(grupa);
			return new ResponseEntity<Grupa>(HttpStatus.OK);
		}
		return new ResponseEntity<Grupa>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Izmena grupe iz baze podataka")
	@PutMapping("/grupa")
	public ResponseEntity<Grupa> updateGrupa(@RequestBody Grupa grupa){
		if(!grupaRepository.existsById(grupa.getId())) {
			return new ResponseEntity<Grupa>(HttpStatus.NO_CONTENT);
		}
		grupaRepository.save(grupa);
		return new ResponseEntity<Grupa>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Brisanje grupe iz baze podataka po odgovarajucem id")
	@Transactional
	@DeleteMapping("/grupa/{id}")
	public ResponseEntity<Grupa> deleteGrupa(@PathVariable("id") Integer id){
		if(!grupaRepository.existsById(id)) {
			return new ResponseEntity<Grupa>(HttpStatus.NO_CONTENT);
		}
		
		//jdbcTemplate.execute("DELETE FROM student WHERE grupa = " + id);
		
		grupaRepository.deleteById(id);
		
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"grupa\"(\"id\", \"oznaka\", \"smer\")"
					+ "VALUES(-100, 'G1', '-100')"
					);
		}
		
		return new ResponseEntity<Grupa>(HttpStatus.OK);
	}
}
