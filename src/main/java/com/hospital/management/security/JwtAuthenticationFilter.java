package com.hospital.management.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 🔥 STEP 1: REQUEST DEBUG
        System.out.println("===== REQUEST START =====");
        System.out.println("URI: " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        System.out.println("AUTH HEADER: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("NO TOKEN FOUND OR INVALID FORMAT");
            filterChain.doFilter(request, response);
            return;
        }

       try {

    String jwt = authHeader.substring(7);
    String userEmail = jwtService.extractUsername(jwt);

    System.out.println("JWT USER: " + userEmail);

    if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(userEmail);

        System.out.println("USER FOUND: " + userDetails.getUsername());

        if (jwtService.validateToken(jwt, userDetails)) {

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            SecurityContextHolder.getContext().setAuthentication(authToken);

            System.out.println("AUTH SET SUCCESS");
        }
    }

} catch (Exception e) {

    e.printStackTrace();   // 🔥 VERY IMPORTANT (not just print)
}
        filterChain.doFilter(request, response);

        System.out.println("===== REQUEST END =====");
    }
}