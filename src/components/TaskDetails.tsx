import React from 'react';
import { Modal, Descriptions, Timeline, Tag, Typography } from 'antd';
import { Task } from '../types/task.types';
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface TaskDetailsProps {
  task: Task;
  visible: boolean;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, visible, onClose }) => {
  return (
    <Modal
      title={`Task Details: ${task.name}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Task ID">{task.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{task.name}</Descriptions.Item>
        <Descriptions.Item label="Owner">{task.owner}</Descriptions.Item>
        <Descriptions.Item label="Command">
          <Text code>{task.command}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Total Executions">
          <Tag color="blue">{task.taskExecutions.length}</Tag>
        </Descriptions.Item>
      </Descriptions>

      {task.taskExecutions.length > 0 && (
        <>
          <h3 style={{ marginTop: 24 }}>Execution History</h3>
          <Timeline>
            {task.taskExecutions.map((execution, index) => (
              <Timeline.Item
                key={index}
                dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}
                color="green"
              >
                <div>
                  <Text strong>Execution #{index + 1}</Text>
                  <br />
                  <Text type="secondary">
                    <ClockCircleOutlined /> Start:{' '}
                    {new Date(execution.startTime).toLocaleString()}
                  </Text>
                  <br />
                  <Text type="secondary">
                    <ClockCircleOutlined /> End:{' '}
                    {new Date(execution.endTime).toLocaleString()}
                  </Text>
                  <br />
                  <Text strong>Output:</Text>
                  <Paragraph
                    code
                    style={{
                      marginTop: 8,
                      padding: 12,
                      background: '#f5f5f5',
                      borderRadius: 4,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {execution.output}
                  </Paragraph>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </>
      )}
    </Modal>
  );
};

export default TaskDetails;
