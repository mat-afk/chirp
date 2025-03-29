package afk.mat.chirp.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import afk.mat.chirp.domain.Chirp;

public interface ChirpRepository extends JpaRepository<Chirp, UUID> {
}
