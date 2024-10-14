## Diagramatic understanding of create-data file 


Start
 |
Create write stream
 |
Call writeData(10000, callback)
 |
i = 10000
 |
Enter write() loop
 |
Generate data -> Write to stream
 |
Is Buffer Full? --> No --> Continue loop (write more)
          |
          Yes
          |
  Wait for 'drain' event
          |
'drain' event occurs -> Call write() again -> Resume writing
 |
All data written? --> No --> Continue loop
        |
        Yes
        |
Execute callback -> Call writeStream.end() -> End
