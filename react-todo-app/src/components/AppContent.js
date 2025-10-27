import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';
import { clearCompletedTodos } from '../slices/todoSlice'; // ✅ import action

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  // ✅ Handler for clearing completed todos
  const handleClearCompleted = () => {
    dispatch(clearCompletedTodos());
  };

  const hasCompleted = todoList.some((todo) => todo.status === 'complete');

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* ✅ Clear Completed button */}
      {hasCompleted && (
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <button
            onClick={handleClearCompleted}
            style={{
              backgroundColor: '#ff5c5c',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#ff3b3b')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ff5c5c')}
          >
            Clear Completed
          </button>
        </div>
      )}

      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
