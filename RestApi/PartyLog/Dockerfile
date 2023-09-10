FROM openjdk:11-jdk
ENV SPRING_PROFILE prod
ADD target/*.jar app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILE}", "-jar", "/app.jar"]