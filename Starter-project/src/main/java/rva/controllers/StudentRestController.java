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
import rva.jpa.Student;
import rva.repository.StudentRepository;

@CrossOrigin	//Lets controller to get called by other origins example angular
@Api(tags = {"Student CRUD operacije"})
@RestController
public class StudentRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private StudentRepository studentRepository;
	
	
	@ApiOperation(value = "Vraca kolekciju studenata iz baze podataka")
	@GetMapping("student")
	public Collection<Student> getStudent(){
		return studentRepository.findAll();
	}
	
	@ApiOperation(value = "Vraca studenta iz baze podataka sa zadatim id")
	@GetMapping("student/{id}")
	public Student getStudent(@PathVariable("id") Integer id) {
		return studentRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraca kolekciju studenata iz baze podataka sa zadatim imenom")
	@GetMapping("student/ime/{ime}")
	public Collection<Student> getStudentByIme(@PathVariable("ime") String ime){
		return studentRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@ApiOperation(value = "Upisuje studenta u bazu podataka")
	@PostMapping("student")
	public ResponseEntity<Student> insertStudent(@RequestBody Student student){
		if(!studentRepository.existsById(student.getId())) {
			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		return new ResponseEntity<Student>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Izmena studenta iz baze podataka")
	@PutMapping("student")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student){
		if(!studentRepository.existsById(student.getId())) {
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		}
		studentRepository.save(student);
		return new ResponseEntity<Student>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Brisanje studenta iz baze podataka po odgovarajucem id")
	@Transactional
	@DeleteMapping("student/{id}")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id") Integer id){
		if(!studentRepository.existsById(id)) {
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		}
		studentRepository.deleteById(id);
		
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"student\"(\"id\", \"ime\", \"prezime\", \"broj_indeksa\", \"grupa\", \"projekat\")"
					+ "VALUES(-100, 'Milan', 'Milankovic', 'IIM-23/2018', '-100', '-100')"
					);
		}
		
		
		return new ResponseEntity<Student>(HttpStatus.OK);
	}
	
}
