const { faker } = require('@faker-js/faker');
const fs = require('fs');

const writeStream = fs.createWriteStream('./data/import.csv');

writeStream.write('name;email;age;salary;isActive\n');

function writeData(totalRows , callback ){
    
    let i = totalRows;

    function write(){
        let canWrite = true;
        for(; i>0 && canWrite; i-- ){

            const firstName = faker.person.firstName();
            const email = faker.internet.email(firstName);
            const age = faker.number.int({min:1 , max:40});
            const salary = faker.number.bigInt({ min:20000 , max:40000});
            const active = faker.datatype.boolean();
            const arr = [firstName,email, age , salary , active];

            canWrite = writeStream.write(arr.join(';') + '\n');
            
            if(!canWrite){
                console.log('Buffer is full , waiting for drain event...');
                writeStream.once('drain', write);
                // with drain event we have attached the write function , return out current function. once drain event wil be thrown , write funciton will be called again.
                return;
            }


        }
       // once all rows are written
        if( i === 0 ){
            callback();
        }
    } 
    write(); 
 }



writeData(100,()=>{
    console.log('Data writing completed');
    writeStream.end();
})
