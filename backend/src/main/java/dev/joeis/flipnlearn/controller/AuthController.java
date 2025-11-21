package dev.joeis.flipnlearn.controller;

import dev.joeis.flipnlearn.dto.SignupRequest;
import dev.joeis.flipnlearn.dto.Response;
import dev.joeis.flipnlearn.domain.model.User;
import dev.joeis.flipnlearn.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {
    private final UserService userService; 

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Response> signup(@Valid @RequestBody SignupRequest request) {
        try {
            User user = userService.createUser(request.email(), request.password(), request.name());

            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new Response(
                    "User created", 
                    true, 
                    Map.of(
                        "userId", user.getId(),
                        "email", user.getEmail(),
                        "name", user.getName()
                    )));
        } catch(IllegalArgumentException e) {
            return ResponseEntity
                .badRequest()
                .body(new Response(e.getMessage(), false, null));
        }
        
    }
    
}
