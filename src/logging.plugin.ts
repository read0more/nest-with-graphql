import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart(): GraphQLRequestListener {
    console.log('Request 시작됨');
    return {
      willSendResponse() {
        console.log('Will Response');
      },
    };
  }
}
