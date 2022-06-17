import React, { useState } from 'react';
import { Column, Table } from 'react-virtualized';
import Draggable from 'react-draggable';
import { useQuery } from 'react-query';

import 'react-virtualized/styles.css';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const TOTAL_WIDTH = 985;

export default function Dashboard() {
  const [state, setState] = useState({
    widths: {
      id: 0.5,
      name: 0.5,
      sales_id: 0.5,
      item_id: 0.5,
      qty: 0.5,
      consumen_name: 0.5,
      transaction_date: 0.5,
    },
  });
  const [value, setValue] = useState({ cellData: '', row: '', col: '' });

  const headerRenderer = ({
    dataKey,
    label,
  }) => {
    return (
      <React.Fragment key={dataKey}>
        <div className='ReactVirtualized__Table__headerTruncatedText'>
          {label}
        </div>
        <Draggable
          axis='x'
          defaultClassName='DragHandle'
          defaultClassNameDragging='DragHandleActive'
          onDrag={(event, { deltaX }) => {
            resizeRow({
              dataKey,
              deltaX
            })
          }}
          position={{ x: 0 }}
        >
          <span className='DragHandleIcon'>⋮</span>
        </Draggable>
      </React.Fragment>
    );
  };

  const resizeRow = ({ dataKey, deltaX }) =>
    setState(prevState => {
      const prevWidths = prevState.widths;
      const percentDelta = deltaX / TOTAL_WIDTH;
      const nextDataKey = dataKey;

      if (dataKey == 'name' && prevWidths.name < state.widths.name) console.log('icon muncul')

      return {
        widths: {
          ...prevWidths,
          [dataKey]: prevWidths[dataKey] - percentDelta,
          [nextDataKey]: prevWidths[nextDataKey] + percentDelta
        }
      };
    });

  const cellRenderer = ({ cellData, rowIndex, columnIndex }) => {
    let isExpanded = value.data && value.row == rowIndex && value.col == columnIndex;
    return (
      <>
        {
          isExpanded
            ?
            <Box
              style={{
                backgroundColor: '#385898',
                color: 'white',
                width: 200,
                position: 'absolute',
                top: 2,
              }}
            >
              <Flex justifyContent='space-between'>
                <Text>{cellData}</Text>
                <AiFillCloseCircle
                  size={13}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setValue({ data: '', row: '', col: '' })}
                />
              </Flex>
            </Box>
            :
            <Box
              onClick={() => setValue({ data: cellData, row: rowIndex, col: columnIndex })}
            >
              <Flex justifyContent='space-between' alignItems='center'>
                <Text className='ReactVirtualized__Table__rowColumn'>{cellData}</Text>
                {cellData?.length > 10 && <BsFillArrowRightCircleFill
                  size={13}
                  color='gray'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setValue({ data: '', row: '', col: '' })}
                />}
              </Flex>
            </Box>
        }
      </>
    );
  };

  const { isLoading, data } = useQuery('repoData', () =>
    fetch('https://delman-fe-api.fly.dev/').then((res) =>
      res.json()
    )
  );

  if (isLoading) return
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    h='100vh'
  >
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='#385898'
    />
  </Box>

  return (
    <Flex
      p='3%'
      width='full'
      direction='column'
      overflowY='hidden'
    >
      <Box textAlign='left' w='100%'>
        <Heading fontFamily='poppins'>Sales Dashboard</Heading>
        <Text as='b' color='facebook.500'>List of Sales Data</Text>
        <Divider my={2} />
      </Box>
      <Table
        width={TOTAL_WIDTH}
        height={420}
        headerHeight={30}
        rowHeight={30}
        rowCount={data.data.length}
        rowGetter={({ index }) => data.data[index]}
        style={{ width: 'auto' }}
      >
        <Column
          headerRenderer={headerRenderer}
          dataKey='id'
          label='ID'
          width={state.widths.id * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='name'
          label='Name'
          width={state.widths.name * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='sales_id'
          label='Sales ID'
          width={state.widths.sales_id * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='item_id'
          label='Item ID'
          width={state.widths.item_id * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='qty'
          label='Qty'
          width={state.widths.qty * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='consumen_name'
          label='Consumen Name'
          width={state.widths.consumen_name * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='transaction_date'
          label='Transaction Date'
          width={state.widths.transaction_date * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
      </Table>
    </Flex>
  );
};