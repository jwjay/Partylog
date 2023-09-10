package com.ssafy.partylog.config;

import com.ssafy.partylog.api.service.UserService;
import com.ssafy.partylog.jwt.JwtAuthenticationFilter;
import com.ssafy.partylog.jwt.JwtExceptionFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity  //Spring Security 설정 활성화
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final UserService userService;

    @Value("${JWT_SECRETKEY}")
    private String JWT_SECRET_KEY;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .httpBasic().disable()
                .csrf().disable()
                .cors().and()
                .authorizeRequests()
                .antMatchers("/user/login**", "/user/join", "/user/logout/**", "/test/**", "/user/mobile/**").permitAll()
                .antMatchers("/api-docs/**", "/swagger-ui/**").permitAll()
                .anyRequest().authenticated()
//                .antMatchers(HttpMethod.POST, "/**").authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(userService, JWT_SECRET_KEY), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtExceptionFilter(), JwtAuthenticationFilter.class)
                .build();
    }

}