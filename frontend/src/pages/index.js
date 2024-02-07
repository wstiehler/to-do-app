import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Skeleton, Empty } from "antd";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";

import { TodosTable } from "src/sections/todo-list/todo-table";
import { TodoCreate } from "src/sections/todo-list/todo-create";

import { useFetchTodosByCompanyId, useFetchTodo } from "src/hooks/use-fetch-todo";

const Page = () => {
  const { data, isLoading, isError } = useFetchTodo(); 
  const [isTodoCreateOpen, setTodoCreateOpen] = useState(false);
  
  const useTodos = (page, rowsPerPage) => {
    return useMemo(() => {
      if (data && Array.isArray(data)) {
        return applyPagination(data, page, rowsPerPage);
      } else {
        return [];
      }
    }, [data, page, rowsPerPage]);
  };

  const useCustomerIds = (todoList) => {
    return useMemo(() => {
      return todoList.map((todoList) => todoList.id);
    }, [todoLists]);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const todoLists = useTodos(page, rowsPerPage);
  const todoListsIds = useCustomerIds(todoLists);
  const todosSelection = useSelection(todoListsIds);

  const count = data && data ? data.length : 0;

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Meus ToDo's | MyToDo-List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Meu To-Do</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    disabled
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Importar
                  </Button>
                  <Button
                    color="inherit"
                    disabled
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Exportar
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => setTodoCreateOpen(true)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Adicionar to-do
                </Button>
              </div>
            </Stack>
            <TodoCreate open={isTodoCreateOpen} onClose={() => setTodoCreateOpen(false)} />
            {isLoading && <Skeleton active paragraph={{ rows: 10 }} />}
            {isError && <Empty />}
            {data && (
              <>
                <TodosTable
                  count={count}
                  items={todoLists}
                  onDeselectAll={todosSelection.handleDeselectAll}
                  onDeselectOne={todosSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={todosSelection.handleSelectAll}
                  onSelectOne={todosSelection.handleSelectOne}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={todosSelection.selected}
                />
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
