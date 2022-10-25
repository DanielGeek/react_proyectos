import NextLink from 'next/link';

import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from "../../components/layouts";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows information if the order is paid or not',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color="success" label="Paid" variant='outlined' />
          : <Chip color="error" label="Not paid" variant='outlined' />
      )
    }
  },
  {
    field: 'order',
    headerName: 'Show order',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${ params.row.id }`} passHref>
          <Link underline='always'>
            Show order
          </Link>
        </NextLink>
      )
    }
  }
];

const rows = [
  { id: 1, paid: true, fullname: 'Daniel Ángel' },
  { id: 2, paid: false, fullname: 'Jessica Baettig' },
  { id: 3, paid: true, fullname: 'Elizabeth Ángel' },
  { id: 4, paid: false, fullname: 'Ruth Ángel' },
  { id: 5, paid: false, fullname: 'Ezequiel Ángel' },
  { id: 6, paid: true, fullname: 'Rebeca Barreto' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title={"Order history"} pageDescription={"customer order history"}>
      <Typography variant='h1' component='h1'>Order history</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height:650, width: '100%' }}>
          <DataGrid
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={ [10] }
          />

        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage;