curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -

yum install -y nodejs

curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

yum install yarn

dnf install glibc fontconfig

npm install phantomjs-prebuilt@2.1.16 --ignore-scripts

npm install -g npm@4.6.1

npm install -g @oracle/ojet-cli

npm install -g @oracle/oraclejet-tooling --save

git clone https://github.com/arise-project/robovault_ui.git

cd robovault_ui

npm install

ojet build

ojet serve