import React from 'react';
import { Form, Input, Select, Modal, message } from 'antd';
import { Server } from '../../../types';
import { geographicRegions } from '../../../data/geographicRegions';

interface LinkServerFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<Server, 'id' | 'status' | 'cpu' | 'memory' | 'disk' | 'network' | 'uptime' | 'lastUpdated'>) => void;
  existingServers?: Server[];
}

const LinkServerForm: React.FC<LinkServerFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  existingServers = [], // Provide empty array as default
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Check if server with same name already exists
      // Check for duplicate server names if existingServers is provided
      const serverExists = existingServers?.some(
        server => server.name.toLowerCase() === values.name.toLowerCase()
      );

      if (serverExists) {
        message.error('A server with this name already exists');
        return;
      }

      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Link New Server"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Link Server"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ region: geographicRegions[0] }}
      >
        <Form.Item
          name="name"
          label="Server Name"
          rules={[
            { required: true, message: 'Please enter the server name' },
            { min: 3, message: 'Server name must be at least 3 characters' },
          ]}
        >
          <Input placeholder="Enter server name" />
        </Form.Item>

        <Form.Item
          name="region"
          label="Server Region"
          rules={[{ required: true, message: 'Please select a region' }]}
        >
          <Select>
            {geographicRegions.map(region => (
              <Select.Option key={region} value={region}>
                {region}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="account"
          label="Account"
          rules={[{ required: true, message: 'Please enter the account name' }]}
        >
          <Input placeholder="Enter account name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LinkServerForm;
