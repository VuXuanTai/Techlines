import React from 'react';
import {
  Box,
  Text,
  Flex,
  Stepper,
  Step,
  StepIndicator,
  StepSeparator,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const OrderStatusStepper = ({ orders }) => {
  const steps = [
    { title: 'Created', description: 'Order Created' },
    { title: 'Paid', description: 'Payment Received' },
    { title: 'Delivered', description: 'Order Delivered' },
    { title: 'Cancelled', description: 'Order Cancelled' },
    { title: 'Success', description: 'Order Completed' },
  ];

  const getStatusStep = (order) => {
    if (order.isCancelled) {
      return 3; // Index của 'Cancelled' trong mảng steps
    } else if (order.isDelivered) {
      return 2; // Index của 'Delivered' trong mảng steps
    } else if (order.isPaid) {
      return 1; // Index của 'Paid' trong mảng steps
    } else {
      return 0; // Index của 'Created' trong mảng steps
    }
  };

  return (
    <Flex direction="column">
      {orders.map((order, index) => (
        <Stepper key={order._id} activeStep={getStatusStep(order)} colorScheme={order.isDelivered ? 'green' : 'blue'}>
          {steps.map((step, stepIndex) => (
            <Step key={stepIndex}>
              <StepIndicator>
                <Box textAlign="center">
                  {step.title}
                  <br />
                  <small>{step.description}</small>
                </Box>
              </StepIndicator>
              {stepIndex < steps.length - 1 && <StepSeparator  />}
            </Step>
          ))}
        </Stepper>
      ))}
    </Flex>
  );
};

export default OrderStatusStepper;
