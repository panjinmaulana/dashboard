import React, { useState } from 'react';
import { Column, Table } from 'react-virtualized';
import Draggable from 'react-draggable';
import { useQuery } from 'react-query';

import 'react-virtualized/styles.css'; // only needs to be imported once
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

const TOTAL_WIDTH = 3000;

export default function Dashboard() {
  const [state, setState] = useState({
    widths: {
      id: 0.5,
      name: 0.5,
      email: 0.5,
      country_name: 0.5,
      device_id: 0.5,
      bitcoin_address: 0.5,
      avatar: 0.5,
      login_ip: 0.5,
      active_device_mac: 0.5,
      notes: 0.5,
      age: 0.5,
      referral_id: 0.5,
      locale: 0.5,
      favorite_music: 0.5,
      phone_number: 0.5,
      twitter_username: 0.5,
      job: 0.5,
      invoice_email_address: 0.5,
      hmac_secret: 0.5,
      favorite_quote: 0.5,
      primary_color: 0.5,
      secondary_color: 0.5,
      material: 0.5,
      shipping_address: 0.5,
      zip_code: 0.5,
      latitude: 0.5,
      favorite_animal: 0.5,
      app_version: 0.5,
      timezone: 0.5,
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
          onDrag={(event, { deltaX }) =>
            resizeRow({
              dataKey,
              deltaX
            })
          }
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
      const nextDataKey = dataKey

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
                width: 800,
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
    fetch('https://delman-fe-api.fly.dev/users').then((res) =>
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
    <Flex p='3%'
      width='full'
      direction='column'
      overflowX='auto'
      overflowY='hidden'
    >
      <Box textAlign='left' w='100%'>
        <Heading fontFamily='poppins'>Sales Dashboard</Heading>
        <Text as='b' color='facebook.500'>List of Sales Data</Text>
        <Divider my={2} />
      </Box>
      <Table
        width={TOTAL_WIDTH}
        height={390}
        headerHeight={30}
        rowHeight={30}
        rowCount={data.data.length}
        rowGetter={({ index }) => data.data[index]}
        style={{ width: '3010px'}}
      >
        <Column
          headerRenderer={headerRenderer}
          dataKey='id'
          label='id'
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
          dataKey='email'
          label='email'
          width={state.widths.email * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='country_name'
          label='Country Name'
          width={state.widths.country_name * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='device_id'
          label='Device ID'
          width={state.widths.device_id * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='bitcoin_address'
          label='Bitcoin Address'
          width={state.widths.bitcoin_address * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='avatar'
          label='Avatar'
          width={state.widths.avatar * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='login_ip'
          label='Login IP'
          width={state.widths.login_ip * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='active_device_mac'
          label='Active Device Mac'
          width={state.widths.active_device_mac * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='notes'
          label='Notes'
          width={state.widths.notes * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='age'
          label='Age'
          width={state.widths.age * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='referral_id'
          label='Referral ID'
          width={state.widths.referral_id * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='locale'
          label='Locale'
          width={state.widths.locale * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='favorite_music'
          label='Favorite Music'
          width={state.widths.favorite_music * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='phone_number'
          label='Phone Number'
          width={state.widths.phone_number * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='twitter_username'
          label='Twitter Username'
          width={state.widths.twitter_username * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='job'
          label='Job'
          width={state.widths.job * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='invoice_email_address'
          label='Invoice Email Address'
          width={state.widths.invoice_email_address * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='hmac_secret'
          label='HMAC Secret'
          width={state.widths.hmac_secret * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='avatar'
          label='Avatar'
          width={state.widths.avatar * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='favorite_quote'
          label='Favorite Quote'
          width={state.widths.favorite_quote * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='primary_color'
          label='Primary Color'
          width={state.widths.primary_color * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='secondary_color'
          label='Secondary Color'
          width={state.widths.secondary_color * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='material'
          label='Material'
          width={state.widths.material * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='shipping_address'
          label='Shipping Address'
          width={state.widths.shipping_address * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='zip_code'
          label='Zip Code'
          width={state.widths.zip_code * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='latitude'
          label='Latitude'
          width={state.widths.latitude * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='favorite_animal'
          label='Favorite Animal'
          width={state.widths.favorite_animal * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='app_version'
          label='App Version'
          width={state.widths.app_version * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
        <Column
          headerRenderer={headerRenderer}
          dataKey='timezone'
          label='Timezone'
          width={state.widths.timezone * TOTAL_WIDTH}
          cellRenderer={cellRenderer}
        />
      </Table>
    </Flex>
  );
};