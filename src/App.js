import { Button, Buttons, Container, Input, Options, Title } from './AppStyles';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

const App = () => {
  const [amount, setAmount] = useState(null);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);
  const [simpleSortedData, setSimpleSortedData] = useState([]);
  const [direction, setDirection] = useState(true);

  useEffect(() => {
    setData(dataFunc(amount).splice(0, amount));
    setLabels(labelFunc(amount));
    setColors(colorFunc(amount).splice(0, amount));
    setSimpleSortedData(data);
  }, [amount]);
  // console.log(data);
  // console.log(labels);
  // console.log(colors);

  // Create labels according to amount
  const labelFunc = (n) => {
    let a = [];
    for (let i = 1; i <= n; i++) {
      a.push(i);
    }
    return a;
  };
  // Create random data number
  const dataFunc = (n) => {
    let a = [];
    for (let i = 0; i <= n; i++) {
      a.push(Math.floor(Math.random() * 100));
    }

    return a;
  };
  // Create random color
  const colorFunc = (n) => {
    let a = [];
    for (let i = 0; i <= n; i++) {
      a.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    return a;
  };

  // HANDLE SIMPLE SORTING
  const handleSimpleSort = (data) => {
    setDirection(!direction);
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        // DESCENDING
        if (direction) {
          if (data[j] > data[i]) {
            let temp = data[i];
            data[i] = data[j];
            data[j] = temp;
          }
          // ASCENDING
        } else {
          if (data[j] < data[i]) {
            let temp = data[i];
            data[i] = data[j];
            data[j] = temp;
          }
        }
      }
    }
    setSimpleSortedData(data);
  };

  return (
    <>
      <Title>Sorting App</Title>
      <Buttons>
        <Button onClick={() => handleSimpleSort(data)}>
          {direction ? 'Simple Sort (asc)' : 'Simple Sort (desc)'}
        </Button>
        <Button>SORT2</Button>
        <Button>SORT3</Button>
        <Button>SORT4</Button>
      </Buttons>
      <Options>
        <Input
          type='number'
          name='number'
          placeholder='Enter amount of values'
          onChange={(e) => setAmount(e.target.value)}
        />
      </Options>
      <Container>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: 'Value',
                data: data,
                backgroundColor: colors,
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </Container>
    </>
  );
};

export default App;
