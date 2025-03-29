package afk.mat.chirp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import afk.mat.chirp.domain.Chirp;
import afk.mat.chirp.domain.CreateChirpDTO;
import afk.mat.chirp.repository.ChirpRepository;

@RestController
@RequestMapping("/chirps")
public class ChirpController {
    
    @Autowired
    private ChirpRepository chirpRepository;

    @GetMapping
    public List<Chirp> getChirps() {
        return this.chirpRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @PostMapping
    public Chirp createChirp(@RequestBody CreateChirpDTO request) {
        Chirp chirp = new Chirp();
        chirp.setContent(request.content());
        chirp.setAuthor(request.author());
        
        return this.chirpRepository.save(chirp);
    }
}
