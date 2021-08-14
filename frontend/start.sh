ls
cd /app
npm install
npm run build
rm -vrf /build/*
mv -v ./build/* /build
ls /build/