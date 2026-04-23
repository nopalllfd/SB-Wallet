FROM node:22.20.0-trixie-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable

RUN apt-get update
RUN apt-get install openssh-server sudo nano -y

COPY --from=builder /app/dist /usr/share/nginx/html

RUN useradd -m -s /bin/bash nopal
RUN usermod -aG sudo nopal
RUN echo "nopal:123" | chpasswd
RUN mkdir -p /home/nopal/.ssh

COPY id_ewallet.pub /home/nopal/.ssh/authorized_keys

RUN chown -R nopal:nopal /home/nopal/.ssh
RUN chmod 700 /home/nopal/.ssh
RUN chmod 600 /home/nopal/.ssh/authorized_keys

RUN sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config 
RUN sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#PubkeyAuthentication.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config

RUN ssh-keygen -A
RUN mkdir -p /var/run/sshd

CMD ["sh", "-c", "service ssh start && nginx -g 'daemon off;'"]