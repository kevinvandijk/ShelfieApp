import StackTrace from 'stacktrace-js';
import { Crashlytics } from 'react-native-fabric';

export default function crashlyticsInitializer() {
  if (__DEV__) return;

  const originalHandler = global.ErrorUtils.getGlobalHandler();

  function errorHandler(e, isFatal) {
    StackTrace.fromError(e, { offline: true }).then(stacktrace => {
      const exceptionInfo = stacktrace.map(row => {
        const { source, lineNumber } = row;
        return { fileName: e.message, lineNumber, functionName: source };
      });

      Crashlytics.recordCustomExceptionName(e.message, e.message, exceptionInfo);
    });

    if (originalHandler) originalHandler(e, isFatal);
  }

  global.ErrorUtils.setGlobalHandler(errorHandler);
}
