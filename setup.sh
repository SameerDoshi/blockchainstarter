#!/usr/bin/sh
echo "install docker"
sudo apt update
sudo apt install docker.io
echo "Install docker-compose"
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

echo "Install fabric samples"
curl -sSL https://bit.ly/2ysbOFE | bash -s

