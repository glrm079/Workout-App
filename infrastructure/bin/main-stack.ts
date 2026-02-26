#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { mainStack } from '../lib/main-stack';

const app = new cdk.App();
new mainStack(app, 'mainStack', {});
