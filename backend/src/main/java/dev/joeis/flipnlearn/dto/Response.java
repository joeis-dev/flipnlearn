package dev.joeis.flipnlearn.dto;

public record Response(
    String message,
    boolean success,
    Object data
) {
    
}
