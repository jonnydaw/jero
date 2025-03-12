FROM maven:3.9.9-eclipse-temurin-21-alpine AS BUILDER
ARG VERSION=0.0.1-SNAPSHOT
WORKDIR /build/
COPY pom.xml /build/
COPY src /build/src/

RUN mvn clean package -DskipTests
COPY target/demo-${VERSION}.jar target/application.jar

FROM openjdk:21
WORKDIR /app/

COPY --from=BUILDER /build/target/application.jar /app/
CMD java -jar /app/application.jar

