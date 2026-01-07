package dev.joeis.flipnlearn.service;

import dev.joeis.flipnlearn.domain.model.User;
import dev.joeis.flipnlearn.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(String email, String plainPassword, String name) {
        if(userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Please use another email");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(plainPassword));
        user.setName(name);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public boolean validateUser(String email, String plainPassword) {
        return userRepository.findByEmail(email)
            .map(user -> passwordEncoder.matches(plainPassword, user.getPassword()))
            .orElse(false);
    }
}
