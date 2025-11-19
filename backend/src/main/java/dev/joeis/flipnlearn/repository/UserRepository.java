package dev.joeis.flipnlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.joeis.flipnlearn.domain.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}