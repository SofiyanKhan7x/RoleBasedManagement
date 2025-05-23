package com.neon.RoleBasedManagement.config;

import com.neon.RoleBasedManagement.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableMethodSecurity(prePostEnabled = true)
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private MyUserDetailsService userDetailsService;

   @Bean
   public  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       return http
               .cors(cors -> cors.configurationSource(corsConfigurationSource()))
               .csrf(customizer -> customizer.disable())
               .authorizeHttpRequests(request -> request
                       .requestMatchers("/api/auth/*")
                       .permitAll()
//                       .requestMatchers("/api/auth/getAllAdmin").hasAnyRole("SUPERADMIN")
                       .anyRequest().authenticated())
                  .authenticationProvider(authenticationProvider())
//               .formLogin(Customizer.withDefaults())
               .httpBasic(Customizer.withDefaults())
               .sessionManagement(session ->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
               .build();
   }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Frontend
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true); // Important for cookies/token headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }




    @Bean
   public AuthenticationProvider authenticationProvider(){
       DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
       provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
       provider.setUserDetailsService(userDetailsService);
       return provider;
   }


   @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
       return config.getAuthenticationManager();
   }
}
