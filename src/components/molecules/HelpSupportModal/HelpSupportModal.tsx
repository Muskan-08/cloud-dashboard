import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // Here you can implement the logic to handle form submission
      console.log('Form submitted:', values);
      message.success('Your message has been sent successfully!');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Failed to send message. Please try again.');
    }
  };

  return (
    <Modal
      title="Help & Support"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: 'Please enter a subject' }]}
        >
          <Input placeholder="Enter the subject of your inquiry" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Describe your issue or question"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HelpSupportModal;
